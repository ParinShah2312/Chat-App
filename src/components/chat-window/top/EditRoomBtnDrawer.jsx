import { Alert, Button, Drawer } from 'rsuite';
import { useMediaQuery, useModalState } from '../../../misc/custom-hooks';
import EditableInput from '../../EditableInput';
import { useCurrentRoom } from '../../../context/current-room.context';
import { memo } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { database } from '../../../misc/firebase';
import { ref, set } from 'firebase/database';

const EditRoomBtnDrawer = () => {
  const { isOpen, open, close } = useModalState();
  const { chatId } = useParams();
  const isMobile = useMediaQuery('(max-width: 992px)');

  const name = useCurrentRoom(v => v.name);
  const description = useCurrentRoom(v => v.description);

  const updateData = (key, value) => {
    set(ref(database, `rooms/${chatId}/${key}`), value)
      .then(() => {
        Alert.success('Successfully updated', 4000);
      })
      .catch(err => {
        Alert.error(err.message, 4000);
      });
  };

  const onNameSave = newName => {
    updateData('name', newName);
  };

  const onDescriptionSave = newDesc => {
    updateData('description', newDesc);
  };

  return (
    <>
      <Button className="br-circle" size="sm" color="red" onClick={open}>
        A
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="right">
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditableInput
            initialValue={name}
            onSave={onNameSave}
            label={<h6 className="mb-2">Name</h6>}
            emptyMsg="Name cannot be empty"
          />
          <EditableInput
            componentClass="textarea"
            rows={5}
            initialValue={description}
            onSave={onDescriptionSave}
            label={<h6 className="mb-2">Description</h6>}
            emptyMsg="Description cannot be empty"
            wrapperClassName="mt-3"
          />
        </Drawer.Body>
        <Drawer.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

export default memo(EditRoomBtnDrawer);
