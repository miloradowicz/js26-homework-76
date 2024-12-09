import { Container, Modal } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import Chat from '@/containers/Chat/Chat';
import UsernameForm from '@/components/UsernameForm/UsernameForm';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  closeUsernameModal,
  selectUsernameModalOpen,
} from '@/store/slices/modalsSlice';

const App = () => {
  const dispatch = useAppDispatch();

  const usernameModalOpen = useAppSelector(selectUsernameModalOpen);

  const handleClose = () => {
    dispatch(closeUsernameModal());
  };

  return (
    <>
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        maxSnack={1}
      >
        <Modal open={usernameModalOpen} onClose={handleClose}>
          <UsernameForm onClose={handleClose} />
        </Modal>
        <Container>
          <Chat />
        </Container>
      </SnackbarProvider>
    </>
  );
};

export default App;
