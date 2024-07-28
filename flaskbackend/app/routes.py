from flask import Blueprint, jsonify, request, make_response, send_file
from services.transcribe import transcribe_audio
from services.cleanup import clean_up_utterances
from services.translation import translate_utterances
from services.TTS import combine_audio_from_transcripts     

from pydub import AudioSegment
import io


linguistify_bp = Blueprint('Linguistify', __name__)

@linguistify_bp.route('/api/generate-tts', methods=['POST'])
def get_tts():  

    print(request.files)

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and file.filename.endswith('.mp3'):
        # filename = secure_filename(file.filename)
        # file_path = os.path.join('/tmp', filename)
        # file.save(file_path) 
        # if we want to save to a file path lol
        print("working")

        transcription = transcribe_audio(file, "en-us").to_dict()
        translated = translate_utterances(transcription, "FR")
        translated_v2 = clean_up_utterances(translated)
        new_audio = combine_audio_from_transcripts(translated_v2)

        mp3_buffer = io.BytesIO()
        new_audio.export(mp3_buffer, format='mp3')
        mp3_buffer.seek(0)

        response = make_response(send_file(mp3_buffer, mimetype='audio/mpeg'))
        response.headers['Content-Disposition'] = 'attachment; filename=output.mp3'
        return response

    
    return jsonify({"error": "Valid mp3 not receieved"}), 400