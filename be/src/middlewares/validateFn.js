const validator = require('validator'); 
const validationFn = { 
    validateUpdateSubmission: function (req, res, next) { 
        console.log("validateUpdateSubmission middleware called"); 
        const fileId = req.body.fileId; 
        const designTitleInput = req.body.designTitle; 
        const designDescriptionInput = req.body.designDescription; 
        
        reDesignTitleInput = new RegExp(`^[\\w\\s]+$`); 
        reDesignDescriptionInput = new RegExp(`^[\\w\\s\\.]+$`); 
        reFileId = new RegExp(`^\\d+$`); 

        if (reDesignTitleInput.test(designTitleInput) && reDesignDescriptionInput.test(designDescriptionInput) && reFileId.test(fileId)) {
            next(); 
        } else { 
            console.log("Error while Updating, most likely validation error"); 
            res.status(500); 
            res.send(`{"message":"Error!!"}`);
        } 
    }, 
    validateCreateSubmission: function (req, res, next) { 
        console.log("validateCreateSubmission middleware called");
        const designTitleInput = req.body.designTitle; 
        const designDescriptionInput = req.body.designDescription; 
        
        reDesignTitleInput = new RegExp(`^[\\w\\s]+$`); 
        reDesignDescriptionInput = new RegExp(`^[\\w\\s\\.]+$`); 

        if (reDesignTitleInput.test(designTitleInput) && reDesignDescriptionInput.test(designDescriptionInput)) {
            next(); 
        } else { 
            console.log("Error while submitting, most likely validation error"); 
            res.status(500); 
            res.send(`{"message":"Error!!"}`);
        } 
    },
    validateSearchSubmission: function (req, res, next) { 
        console.log("validateSearchSubmission middleware called");
        const searchInput = req.params.search; 
        
        researchInput = new RegExp(`^[\\w\\s]+$`); 

        if (researchInput.test(searchInput)) {
            next(); 
        } else { 
            console.log("Error while searching, most likely validation error"); 
            res.status(500); 
            res.send(`{"message":"Error!!"}`);
        } 
    },
    validateRegistration: function (req, res, next) { 
        console.log("validateRegistration middleware called");
        const userNameInput = req.body.fullName;
        const userEmailInput = req.body.email; 
        const userPasswordInput = req.body.password;  
        
        reuserNameInput = new RegExp(`^[\\w\\s]+$`);
        reuserPasswordInput = new RegExp(`^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$&*])(?=.*[0-9]).{8,16}$`);

        if (reuserNameInput.test(userNameInput) && validator.isEmail(userEmailInput) && reuserPasswordInput.test(userPasswordInput)) {
            next(); 
        } else { 
            console.log("Error while searching, most likely validation error"); 
            res.status(500); 
            res.send(`{"message":"Error!!"}`);
        } 
    },
    validateInviteFriend: function (req, res, next) { 
        console.log("validateInviteFriendSubmission middleware called");
        const friendNameInput = req.body.recipientName;
        const friendEmailInput = req.body.recipientEmail; 

        refriendNameInput = new RegExp(`^[\\w\\s]+$`);
        
        if (refriendNameInput.test(friendNameInput) && validator.isEmail(friendEmailInput)) {
            next(); 
        } else { 
            console.log("Error while searching, most likely validation error"); 
            res.status(500); 
            res.send(`{"message":"Error!!"}`);
        } 
    },
} //end validationFn 

module.exports = validationFn;