enum RequirementTypes {
    OWN_USER = "ownUser",
    ADMIN = "admin",
    MASTER = "master",
    IS_BOSCH = "isBosch",
    ADMIN_AND_BOSCH = "adminAndBosch",
}

interface IReqRequirements {
    [property: string]: boolean;
}

export {
    RequirementTypes,
    IReqRequirements
};