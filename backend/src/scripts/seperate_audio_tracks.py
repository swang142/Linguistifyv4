from spleeter.separator import Separator

# Initialize the separator with 2 stems (vocals and accompaniment)
separator = Separator('spleeter:2stems')

# Separate the audio file into two tracks
separator.separate_to_file('mr_beast_video.wav', 'output_directory')

# The output directory will contain separate files for vocals and accompaniment
