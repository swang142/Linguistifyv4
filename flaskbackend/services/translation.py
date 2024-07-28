import deepl
import os
from dotenv import load_dotenv
import json

load_dotenv()
API_KEY = os.getenv("DL_API_KEY")


def translate_utterances(data_json, target_language):
    auth_key = API_KEY
    translator = deepl.Translator(auth_key)


    extracted_data = {
        "utterances": []
    }

    def translate_text(text, target_language):
        result = translator.translate_text(text, target_lang=target_language)
        return result.text

    # Iterate over the utterances to extract the required attributes
    for utterance in data_json['results']['utterances']:
        start = utterance['start']
        end = utterance['end']
        utterance_text = utterance['transcript']
        speaker = utterance['speaker']
        sentiment = utterance['sentiment']
        sentiment_score = utterance['sentiment_score']
        utterance_id = utterance['id']

        utterance_text_translated = translate_text(utterance_text, target_language)

        new_utterance = {
            'id': utterance_id,
            'start': start,
            'end': end,
            'translated_transcript': utterance_text_translated,
            'transcript': utterance_text,
            'speaker': speaker,
            'sentiment': sentiment,
            'sentiment_score': sentiment_score
        }

        extracted_data['utterances'].append(new_utterance)

    return extracted_data
