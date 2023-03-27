import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Modal from './Modal';
import { ModalContext } from '../../contexts/ModalContext';

describe('Modal component', () => {
    it('calls closeModal when close button is clicked', () => {
        const closeModalMock = jest.fn();
        const modalContextValue = {
          closeModal: closeModalMock,
        };
    
        render(
          <ModalContext.Provider value={modalContextValue}>
            <Modal />
          </ModalContext.Provider>
        );
    
        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);
    
        expect(closeModalMock).toHaveBeenCalled();
      });
    
      it('renders children correctly', () => {
        const closeModalMock = jest.fn();
        const modalContextValue = {
          closeModal: closeModalMock,
        };
        render(
            <ModalContext.Provider value={modalContextValue}>
              <Modal>Test Content</Modal>
            </ModalContext.Provider>
          );
        const contentElement = screen.getByText(/Test Content/i);
        expect(contentElement).toBeInTheDocument();
      });

  it('should call closeModal when clicked outside the modal', () => {
    const closeModalMock = jest.fn();
    const modalContextValue = {
      closeModal: closeModalMock,
    };
    render(
      <ModalContext.Provider value={modalContextValue}>
        <Modal />
      </ModalContext.Provider>
    );
    const modalOverlay = screen.getByTestId('modal-overlay');
    fireEvent.click(modalOverlay);
    expect(closeModalMock).toHaveBeenCalled();
  });

  it('should not close modal when clicked inside the modal', () => {
    const closeModalMock = jest.fn();
    const modalContextValue = {
      closeModal: closeModalMock,
    };
    render(
      <ModalContext.Provider value={modalContextValue}>
        <Modal>
          <div data-testid="modal-content">Modal Content</div>
        </Modal>
      </ModalContext.Provider>
    );
    const modalContent = screen.getByTestId('modal-content');
    fireEvent.click(modalContent);
    expect(closeModalMock).not.toHaveBeenCalled();
  });
});
