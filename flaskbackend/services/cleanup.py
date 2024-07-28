import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GPT_API_KEY")

client = OpenAI(api_key=API_KEY)

def clean_up_utterances(data_json):
    utterances = data_json['utterances']
    translated_data = {"utterances": []}

    def cleanUpUtterance(currentUtterance, prevUtterance, nextUtterance, originalUtterance, speaker, sentimentScore, duration):
        completion = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": """
                You are a foreign language bot assistant whose role is to clean up sentence flow and make them more concise through utterances. Your response must be in the same language as the original.
                
                You will be given an utterance, in the form of a spoken word or a statement that can include incomplete or over-complicated sentences that are too lengthy.
                You will also be given the speaker, overall sentiment score of the utterance (-1 is negative, 0 is neutral, 1 is positive), duration,
                the originalUtterance (storing the original text in English before translation), and the utterance preceding it and/or the utterance following it. The input will be in this format

                Current Utterance: **currentUtterance**, Previous Utterance: **prevUtterance**, Next Utterance: **nextUtterance**, Original Utterance: **originalUtterance**, Speaker: **speaker**, Sentiment Score: **sentimentScore**, Duration: **duration**

                Your job is to do the following: determine and analyze the context based on previous, next, and original utterances to polish the current utterance
                and make them more concise.

                The new utterance must preserve the meaning of the current one, both the translated and untranslated versions, and perfectly fit the duration specified (or be close to it).
                It must also reflect the overall sentiment score of the utterance. Pay attention to the untranslated version, if that version seemed fast or slow, the response of the new one should also reflect the same pace of speech.
                You do not need to be formal, you can use plain language. Keep tone, intonation, and intent of words in mind.
                
                Here are the exceptions:
                    If the current utterance is the first one, there is no preceding utterance, and thus the preceding utterance will have value "N/A"
                    If the current utterance is the last one, there is no following utterance, and thus the following utterance will have value "N/A"
                    If the Speaker of the utterance preceding is different, disregard the preceding utterance as we do not need to link with it.
                    If the Speaker of the utterance following is different, disregard the following utterance as we do not need to link with it.
                
                 The output should just be the new utterance in text form, and does not need to match the format of the input.
                 """},
                {"role": "user", "content": f"Current Utterance: {currentUtterance}, Previous Utterance: {prevUtterance}, Next Utterance: {nextUtterance}, Original Utterance: {originalUtterance}, Speaker: {speaker}, Sentiment Score: {sentimentScore}, Duration: {duration}"}
            ]
        )

        return completion.choices[0].message.content

    for i in range(len(utterances)):
        current_utterance = utterances[i]
        previous_utterance = utterances[i - 1] if i > 0 else None
        next_utterance = utterances[i + 1] if i < len(utterances) - 1 else None

        start = current_utterance['start']
        end = current_utterance['end']
        speaker = current_utterance['speaker']
        sentiment = current_utterance['sentiment']
        sentiment_score = current_utterance['sentiment_score']
        utterance_id = current_utterance['id']
        originalText = current_utterance['transcript']
        curText = current_utterance['translated_transcript']
        prevText = previous_utterance['translated_transcript'] if previous_utterance else "N/A"
        nextText = next_utterance['translated_transcript'] if next_utterance else "N/A"

        duration = end - start

        # Clean up utterance using context from previous and next utterances
        cleaned_text = cleanUpUtterance(curText, prevText, nextText, originalText, speaker, sentiment_score, duration)

        # Create a new utterance dictionary with the cleaned translated_transcript
        new_utterance = {
            'id': utterance_id,
            'start': start,
            'end': end,
            'new_transcript': cleaned_text,
            'speaker': speaker,
            'sentiment': sentiment,
            'sentiment_score': sentiment_score
        }

        # Append the new utterance to the translated_data dictionary
        translated_data['utterances'].append(new_utterance)

    return translated_data
