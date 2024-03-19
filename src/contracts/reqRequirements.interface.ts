enum RequirementTypes {
    OWN_USER = "ownUser",
    ADMIN = "admin",
    MASTER = "master",
    IS_BOSCH = "isBosch"
}

interface IReqRequirements {
    [property: string]: boolean;
}

export {
    RequirementTypes,
    IReqRequirements
};