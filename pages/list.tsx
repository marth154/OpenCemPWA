import Layout from "../src/components/layout";
import ListPoint from "../src/components/list/ListPoint";
import ListUser from "../src/components/list/ListUser";
import useSession from "../src/hook/useSession";
export default function List() {
    const session = useSession()
    return (
        <>
            <Layout>
                {session.role === "user" && <ListPoint />}
                {session.role === "admin" && <ListUser />}
            </Layout>
        </>
    )
}