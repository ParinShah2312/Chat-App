import { useState } from 'react';
import { auth } from '../../misc/firebase';
import { Alert, Button, Icon, Tag } from 'rsuite';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
  unlink,
} from 'firebase/auth';

const ProviderBlock = () => {
  const [isConnected, setIsConnected] = useState({
    'google.com': auth.currentUser?.providerData?.some(
      data => data.providerId === 'google.com'
    ),
    'facebook.com': auth.currentUser?.providerData?.some(
      data => data.providerId === 'facebook.com'
    ),
  });

  const updateIsConnected = (providerId, value) => {
    setIsConnected(p => {
      return {
        ...p,
        [providerId]: value,
      };
    });
  };

  const unlinkProvider = async providerId => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`You cannot disconnect from ${providerId}`);
      }

      await unlink(auth.currentUser, providerId);
      updateIsConnected(providerId, false);
      Alert.info(`Disconnected from ${providerId}`, 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const unlinkFacebook = () => {
    unlinkProvider('facebook.com');
  };
  const unlinkGoogle = () => {
    unlinkProvider('google.com');
  };

  const linkProvider = async provider => {
    try {
      await linkWithPopup(auth.currentUser, provider);
      updateIsConnected(provider.providerId, true);
      Alert.info(`Linked to ${provider.providerId}`, 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const linkFacebook = () => {
    linkProvider(new FacebookAuthProvider());
  };
  const linkGoogle = () => {
    linkProvider(new GoogleAuthProvider());
  };

  return (
    <div>
      {isConnected['google.com'] && (
        <Tag color="green" closable onClose={unlinkGoogle}>
          <Icon icon="google" /> Connected
        </Tag>
      )}
      {isConnected['facebook.com'] && (
        <Tag color="blue" closable onClose={unlinkFacebook}>
          <Icon icon="facebook" /> Connected
        </Tag>
      )}
      <div className="mt-2">
        {!isConnected['google.com'] && (
          <Button block color="green" onClick={linkGoogle}>
            <Icon icon="google" /> Link to Google
          </Button>
        )}
        {!isConnected['facebook.com'] && (
          <Button block color="blue" onClick={linkFacebook}>
            <Icon icon="facebook" /> Link to Facebook
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProviderBlock;
