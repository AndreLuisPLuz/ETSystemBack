interface IAdminCreateInsertionPayload {
    userIndex: number;
    isMaster: boolean;
}

const adminPayloads:IAdminCreateInsertionPayload[] = [
    {
        userIndex: 0,
        isMaster: true
    },
    {
        userIndex: 1,
        isMaster: true
    },
    {
        userIndex: 3,
        isMaster: false
    },
    {
        userIndex: 5,
        isMaster: false
    },
    {
        userIndex: 10,
        isMaster: false
    },
    {
        userIndex: 13,
        isMaster: false
    },
    {
        userIndex: 15,
        isMaster: false
    },
]

export default adminPayloads