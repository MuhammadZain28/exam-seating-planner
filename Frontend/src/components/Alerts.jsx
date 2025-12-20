import { createContext, useContext, useState } from "react";
import OkCloseMessageBox from "./OkClose.jsx";
import { MessageCircleWarningIcon } from "lucide-react";
const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    resolve: null,
    title: "Alert",
    icon: <MessageCircleWarningIcon />
  });

  function alertBox(message, title = "Alert", icon = <MessageCircleWarningIcon />) {
    return new Promise((resolve) => {
      setAlertState({ open: true, message, resolve, title, icon });
    });
  }

  function handleOk() {
    alertState.resolve?.(true); // return control back
    setAlertState({ ...alertState, open: false });
  }

  function handleCancel() {
    alertState.resolve?.(false);
    setAlertState({ ...alertState, open: false });
  }

  return (
    <AlertContext.Provider value={{ alertBox }}>
      {children}

      <OkCloseMessageBox
        open={alertState.open}
        title={alertState.title}
        message={alertState.message}
        icon={alertState.icon}
        hideCloseButton={alertState.title === "Success"}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </AlertContext.Provider>
  );
}

export function useAlertBox() {
  return useContext(AlertContext);
}
