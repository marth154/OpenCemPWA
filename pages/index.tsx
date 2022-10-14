import dynamic from "next/dynamic";
import ProgressSpinner from "../src/utils/PrgrossSpiner";

const MapContainerComponent
  = dynamic(() => import("../src/components/maps/MapContainerComponent"), {
    loading: () => <ProgressSpinner />,
    ssr: false,
  });

export default function Home() {
  return (
    <>

    </>
  )
}