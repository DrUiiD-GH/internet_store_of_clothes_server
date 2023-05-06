module.exports = class UserInfoDTO{
    email;
    name;
    phoneNumber;
    address;
    constructor(model) {
        this.name = model.name
        this.email = model.email
        this.phoneNumber = model.phoneNumber
        this.address = model.address
    }

}