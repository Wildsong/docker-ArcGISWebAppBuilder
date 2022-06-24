"""
WebAppBuilder Python Toolbox (a ".pyt" file)

This requires Python 3, so don't even think about using ArcMap.

@author: Brian Wilson <brian@wildsong.biz>
"""
import re
import sys
import os
import arcpy
from datetime import datetime

# You have to be able to access this folder to use this tool.
SERVER_FOLDER = "\\\\cc-gis\\C$\\inetpub\\wwwroot\\Apps"
VERSION = "2022-06-24"

def do_repair_work(data) -> tuple:
    """
    Process a list with the data from the file in it,
    
    Return tuple containing a count and a list of repaired data.
    """
    previous_line = None
    re_search = re.compile(r'"icon":\s+\"/webappbuilder')
    output = list()
    count = 0
    for line in data:
        line = line.rstrip()  # Remove newline
        if previous_line:
            if re_search.search(line):
                # drop this line and remove the comma from the previous line
                if previous_line.endswith(','):
                    previous_line = previous_line[:-1]
                line = None  # this line will be dropped
                count += 1
            output.append(previous_line + '\n')
        previous_line = line
    if previous_line:
        output.append(previous_line + '\n')
    return (count, output)


def remove_icon(config_file: str, backup_file: str) -> int:
    """
    Removes widget icons from the JSON file after making a backup of it.
    If there were none, does nothing.

    Returns a count of the lines dropped.
    """
    # Read the original file into memory
    with open(config_file, "r") as fp:
        config_data = fp.readlines()

    (count, repaired_data) = do_repair_work(config_data)

    if count:
        # Write the original data into a backup file.
        with open(backup_file, "w") as fp:
            fp.writelines(config_data)
        print("Wrote backup file \"%s\"" % backup_file)

        # Overwrite the original file.
        with open(config_file, "w") as fp:
            fp.writelines(repaired_data)

    return count

class RemoveIcons_tool(object):
    def __init__(self) -> None:
        self.label = f"Remove Icons tool ({VERSION})"
        self.canRunInBackground = False
        #self.stylesheet = "" # I don't know how to use this yet.

    def getParameterInfo(self) -> list:

        # params[0] = config file
        input_config_file = arcpy.Parameter(name="input_config_file",
            displayName="config.json",
            datatype="DEFile",
            parameterType="Required",  # Required|Optional|Derived
            direction="Input",  # Input|Output
        )
        # You can set filters here for example
        input_config_file.filter.list = ["json"]
        # You can set a default if you want -- this makes debugging a little easier.
        input_config_file.value = os.path.join(SERVER_FOLDER+"\\ClatsopCounty", "config.json")

        
        # params[1] = backup file
        output_backup_file = arcpy.Parameter(name="output_backup_file",
            displayName="Backup file",
            datatype="DEFile",
            parameterType="Required",  # Required|Optional|Derived
            direction="Output",  # Input|Output
        )
        # You can set filters here for example
        datestamp = datetime.now().strftime("%Y%m%d-%H%M")  # good for filenames
        output_backup_file.value = input_config_file.valueAsText + '.' + datestamp

        return [input_config_file, output_backup_file]

    def isLicensed(self) -> bool:
        """Set whether tool is licensed to execute."""
        return True

    def updateParameters(self, parameters) -> None:
        """Modify the values and properties of parameters before internal
        validation is performed.  This method is called whenever a parameter
        has been changed."""

        if parameters[0].altered:
            if not arcpy.Exists(parameters[0].value):
                parameters[0].setErrorMessage("Config file does not exist.")

        if parameters[1].altered:
            # It might be better to only show a list of date fields but this is a demo...
            found = False
            if not found:
                parameters[1].setErrorMessage("No such field [%s]" % parameters[1].valueAsText)

        return


    def updateMessages(self, parameters) -> None:
        """Modify the messages created by internal validation for each tool
        parameter.  This method is called after internal validation."""

        if not os.path.exists(parameters[0].valueAsText):
            parameters[0].setWarningMessage("File does not exist.")

        if os.path.exists(parameters[1].valueAsText):
            parameters[1].setWarningMessage("File will be overwritten.")
        return


    def execute(self, parameters, messages) -> None:
        """This is the code that executes when you click the "Run" button."""
        
        # See http://resources.arcgis.com/en/help/main/10.2/index.html#//018z00000063000000
        input_config_file  = parameters[0].valueAsText
        output_backup_file = parameters[1].valueAsText
        
        try:
            count = remove_icon(input_config_file, output_backup_file)
            if not count:
                messages.addMessage("No widget icons found in this file, so I did nothing.")
            else:
                messages.addMessage(f"I dropped {count} lines") 
                messages.addMessage(f"from \"{input_config_file}\"")
                messages.addMessage(f"and saved a copy in \"{output_backup_file}\".")
        except Exception as e:
            arcpy.AddError("Fail! %s" % e)
        return
        
class Toolbox(object):
    def __init__(self):
        self.label = "WABDE Toolbox"
        self.alias = "WABDEToolbox"  # no special characters including spaces!
        self.description = """Clatsop County's WebAppBuilder tools"""
        self.tools = [
            RemoveIcons_tool
        ]

def list_tools() -> None:
    toolbox = Toolbox()
    print("toolbox:", toolbox.label)
    print("description:", toolbox.description)
    print("tools:")
    for t in toolbox.tools:
        tool = t()
        print('  ', tool.label)
        print('   description:', tool.description)
        for param in tool.getParameterInfo():
            print('    ',param.name,':',param.displayName)
        print()

def unit_test():
    assert(os.path.exists(SERVER_FOLDER))
    list_tools()
    if sys.argv[1] == '-t':
        # unit test
        test_data = [
            "1 The comma should be removed from this line,",
            '2 "icon": "/webappbuilder  this line should get dropped',
            "3 This line should have a comma at the end,",
            '4 "icon": this line does not match so it should be in output.',
            "5 This should be the last line."
        ]
        print("Running tests")
        (count, repaired) = do_repair_work(test_data)

    else:
        config_file = sys.argv[1]
        datestamp = datetime.now().strftime("%Y%m%d-%H%M")  # good for filenames
        backup_file = config_file + '.' + datestamp
        count = remove_icon(config_file, backup_file)

    print("Number of lines dropped: %d" % count)
    
# That's all!
