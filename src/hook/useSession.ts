import { useContext } from "react";
import { SessionContext } from "../context/SessionProvider";

// ----------------------------------------------------------------------

const useSession = () => useContext(SessionContext);

export default useSession;
