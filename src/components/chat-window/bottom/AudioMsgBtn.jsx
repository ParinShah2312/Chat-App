import { useCallback, useState } from 'react';
import { ReactMic } from 'react-mic';
import { Alert, Icon } from 'rsuite';
import InputGroupButton from 'rsuite/lib/InputGroup/InputGroupButton';
import { storage } from '../../../misc/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AudioMsgBtn = ({ afterUpload }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { chatId } = window;

  const onClick = useCallback(() => {
    setIsRecording(p => !p);
  }, []);

  const onUpload = useCallback(
    async data => {
      setIsUploading(true);
      try {
        const snap = await uploadBytes(
          ref(storage, `/chat/${chatId}/audio_${Date.now()}.mp3`),
          data.blob,
          {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          }
        );

        const file = {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await getDownloadURL(snap.ref),
        };

        setIsUploading(false);
        afterUpload([file]);
      } catch (err) {
        setIsUploading(false);
        Alert.error(err.message, 4000);
      }
    },
    [afterUpload, chatId]
  );

  return (
    <>
      <InputGroupButton
        onClick={onClick}
        disabled={isUploading}
        className={isRecording ? 'animate-blink' : ''}
      >
        <Icon icon="microphone" />
        <ReactMic
          record={isRecording}
          className="d-none"
          onStop={onUpload}
          mimeType="audio/mp3"
        />
      </InputGroupButton>
    </>
  );
};

export default AudioMsgBtn;
