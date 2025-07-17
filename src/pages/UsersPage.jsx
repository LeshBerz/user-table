import { Observer } from "mobx-react-lite";
import usersStore from "../stores/users";
import Table from "../components/Table/Table";

function UsersPage(){
    return(
        <Observer>
            {() => (
                <div>
                    {usersStore.error && <div> Error: {usersStore.error}</div>}
                    {usersStore.loading ? (
                        <div>
                            <div>Loading...</div>
                        </div>
                ) : (
                    <Table users = {usersStore.users} />
                    )}
                </div>
            )}
        </Observer>
    )
}

export default UsersPage;