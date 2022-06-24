"""
 Read a config.json file and remove the weird references to icon.png files.

 Normally I expect this to be called from a Python Toolbox but you can use it at the command line too.

 Give me a filename and I will repair the file and spit the new data out to STDOUT.
 Give me nothing and I will run a unit test

 Use these commands to test it on sample.json; look at results, and restore original sample.json

   python remove_icon.py sample.json
   diff sample.json*
   mv sample.json.* sample.json
"""
import sys
import re
from datetime import datetime

def do_repair_work(data) -> list:
    """
    Process a list with the data from the file in it,
    
    Return a list of repaired data.
    """
    previous_line = None
    re_search = re.compile(r'"icon":\s+\"/webappbuilder')
    output = list()
    for line in data:
        line = line.rstrip() # Remove newline
        if previous_line:
            if re_search.search(line):
                # drop this line and remove the comma from the previous line
                if previous_line.endswith(','):
                    previous_line = previous_line[:-1]
                line = None # this line will be dropped
            output.append(previous_line + '\n')
        previous_line = line
    if previous_line:
        output.append(previous_line + '\n')
    return output


def remove_icon(config_file: str) -> str:
    """
    Removes widget icons from the JSON file after making a backup of it.

    Returns the name of the backup file.
    """
    datestamp = datetime.now().strftime("%Y%m%d-%H%M")  # good for filenames

    # Read the original file into memory
    with open(config_file, "r") as fp:
        config_data = fp.readlines()

    # Write the original data into a backup file
    backup_file = config_file + '.' + datestamp
    with open(backup_file, "w") as fp:
        fp.writelines(config_data)
    print("Wrote backup file \"%s\"" % backup_file)

    repaired_data = do_repair_work(config_data)

    with open(config_file, "w") as fp:
        fp.writelines(repaired_data)

    return backup_file


def usage() -> None:
    print("""
Filters out the stupid "icon" lines from WABDE config.json files.

  python remove_icon.py -t            run a unit test 
  python remove_icon.py config.json   save a copy of config.json and filter it

The backup copy of the file will have a datestamp, like "config.json.20220624"
""")
    exit(-1)


if __name__ == "__main__":

    if len(sys.argv) <= 1: usage()
    
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
        do_repair_work(test_data)
        exit(0)

    remove_icon(sys.argv[1])
