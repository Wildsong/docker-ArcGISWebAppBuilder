"""
 Read a config.json file and remove the weird references to icon.png files.

 Give me a filename and I will repair the file and spit the new data out to STDOUT.
 Give me nothing and I will run a unit test
"""
import sys
import re
from datetime import datetime

def do_work(data):
    previous_line = None
    re_search = re.compile(r'"icon":\s+\"/webappbuilder')

    for line in data:
        line = line.rstrip() # Remove newline
        if previous_line:
            if re_search.search(line):
                # drop this line and remove the comma from the previous line
                if previous_line.endswith(','):
                    previous_line = previous_line[:-1]
                line = None # this line will be dropped
            print(previous_line)
        previous_line = line
    if previous_line:
        print(previous_line)

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
        do_work(test_data)
        exit(0)

    datestamp = datetime.now().strftime("%Y%m%d-%H%M") # good for filenames
    config = sys.argv[1]
    with open(config, "r") as fp:
        config_data = fp.readlines()

    backup = config + '.' + datestamp
    with open(backup, "w") as fp:
        fp.writelines(backup)
    print("Wrote backup file \"%s\"" % backup)
    do_work(config_data)

