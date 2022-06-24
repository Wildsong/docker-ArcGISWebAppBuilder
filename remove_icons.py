import re
import sys
from datetime import datetime

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



if __name__ == "__main__":

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

    print("Number of lines dropped: %d" % count)
