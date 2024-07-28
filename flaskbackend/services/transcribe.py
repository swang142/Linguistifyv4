import os
from dotenv import load_dotenv
from deepgram import DeepgramClient, PrerecordedOptions, FileSource
import json

load_dotenv()

API_KEY = os.getenv("DG_API_KEY")

def transcribe_audio(file, language):
    try:
        # Create a Deepgram client using the API key
        deepgram = DeepgramClient(API_KEY)

        buffer_data = file.read()

        payload: FileSource = {
            "buffer": buffer_data,
        }

        # Configure Deepgram options for audio analysis
        options = PrerecordedOptions(
            model="nova-2",
            smart_format=True,
            language=language,
            intents=True,
            sentiment=True,
            detect_entities=True,
            punctuate=True,
            utterances=True,
            paragraphs=True,
            diarize=True,
        )

        # Call the transcribe_file method with the text payload and options
        response = deepgram.listen.prerecorded.v("1").transcribe_file(payload, options)

        return response

    except Exception as e:
        return {"error": str(e)}
