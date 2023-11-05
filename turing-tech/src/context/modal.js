import React, { createContext, useReducer } from "react";
import { Modal } from "../components/modal";

const initialState = {
  openDialog: false,
  title: "",
  body: null,
  message: undefined,
  bodyProps: null,
  onSubmit: () => undefined,
  onClose: () => undefined,
  type: "default",
  primaryButtonText: "Save",
  secondaryButtonText: "Cancel",
};

export const dialogReducer = (state, action) => {
  if (action.type === "show") {
    return {
      ...action,
      openDialog: true,
    };
  } else if (action.type === "hide") {
    return { ...state, openDialog: false };
  } else {
    return initialState;
  }
};

const defaultValue = {
  hideDialog: () => undefined,
  showDialog: () => undefined,
};

export const ModalContext = createContext(defaultValue);

export const ModalProvider = ({ children }) => {
  const [
    {
      openDialog,
      header,
      component,
      onSubmit,
      onClose,
      maxWidth,
      primaryButtonText,
      secondaryButtonText,
    },
    dispatch,
  ] = useReducer(dialogReducer, initialState);

  const showDialog = (dialogInput) => {
    dispatch({
      ...dialogInput,
      type: "show",
    });
  };

  const hideDialog = () => {
    dispatch({ type: "hide" });
  };

  return (
    <ModalContext.Provider value={{ hideDialog, showDialog }}>
      {children}
      <Modal
        maxWidth={maxWidth}
        header={header}
        component={component}
        open={openDialog}
        onConfirm={onSubmit}
        onClose={() => {
          onClose?.();
          hideDialog();
        }}
        primaryButtonText={primaryButtonText}
        secondaryButtonText={secondaryButtonText}
      />
    </ModalContext.Provider>
  );
};
