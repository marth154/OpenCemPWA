import { Container } from "@mui/material";
import dynamic from "next/dynamic";
import Layout from "../src/components/layout";
import ProgressSpinner from "../src/utils/PrgrossSpiner";

const MapContainerComponent
  = dynamic(() => import("../src/components/maps/MapContainerComponent"), {
    loading: () => <ProgressSpinner />,
    ssr: false,
  });

export default function Map() {
  return (
    <>
      <Layout>
        <Container maxWidth={false}>
          <MapContainerComponent />
        </Container>
      </Layout>
    </>
  )
}