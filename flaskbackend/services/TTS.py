import os
import json
import requests
from dotenv import load_dotenv
from pydub import AudioSegment

load_dotenv()

api_key = os.getenv("ELEVEN_LABS_API_KEY")

languageVoiceId = {
    "Spanish": "ThT5KcBeYPX3keUQqHPh",
    "GermanM": "ErXwobaYiN019PkySvjV",
    "GermanF": "jsCqWAovK2LkecY7zXl4",
    "PolishM": "IKne3meq5aSn9XLyUdCD",
    "PolishF": "ThT5KcBeYPX3keUQqHPh",
    "ChineseF": "Ca5bKgudqKJzq8YRFoAz",
    "FrenchM": "pNInz6obpgDQGcFmaJgB",
}

def combine_audio_from_transcripts(data_json, target_language="fr-FR"):
    headers = {
        'Content-Type': 'application/json',
        'xi-api-key': api_key
    }

    utterances = data_json['utterances']

    begin = 0
    audio_clips = []

    for count, utterance in enumerate(utterances):
        data = {
            "text": utterance['new_transcript'],
            "model_id": "eleven_multilingual_v2",
            "voice_settings": {
                "stability": 0.5,
                "similarity_boost": 0.8,
                "style": 0.8,
                "use_speaker_boost": True,
            },
            "language": target_language,
        }

        endpoint = f"https://api.elevenlabs.io/v1/text-to-speech/{languageVoiceId['FrenchM']}"  # You can adjust this based on the language

        target_duration = utterance['end'] - utterance['start']
        response = requests.post(endpoint, headers=headers, json=data)

        if response.status_code == 200:
            audio_file_path = f'output_individual{count}.wav'
            with open(audio_file_path, 'wb') as f:
                f.write(response.content)
            audio_clip = AudioSegment.from_file(audio_file_path)

            # Append the pause
            pause_duration = (utterance['start'] - begin) * 1000
            audio_clips.append(AudioSegment.silent(duration=pause_duration))

            # Adjust the speed of the audio clip
            original_duration = audio_clip.duration_seconds * 1000  # in milliseconds
            speed_factor = original_duration / (target_duration * 1000)
            adjusted_clip = audio_clip.speedup(playback_speed=speed_factor)

            audio_clips.append(adjusted_clip)

            # Reset begin
            begin = utterance['end']

            print(f"Audio {count} saved and adjusted successfully.")
        else:
            print("Error:", response.status_code, response.text)

    # Combine the adjusted audio clips
    combined_audio = sum(audio_clips)

    return combined_audio
