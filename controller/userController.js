const User = require("../model/user");
const mongoose = require('mongoose');

async function add(data, callback) {
    try {
        console.log("data: " + JSON.stringify(data));
        const user = new User(data);
        await user.save();
        callback({ success: true });
    } catch (err) {
        console.log(err);
        callback({ success: false, error: err.message });
    }
}

async function show(req, res, next) {
    try {
        console.log('Fetching user data...');
        const data = await User.find() || [];
        console.log('Fetched data:', data);
     
        if (res) {
            res.json(data);
        } else {
            console.error('Response object is undefined');
        }
        
        return data;
    } catch (err) {
        console.error('Error fetching user data:', err);

       
        if (res) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.error('Response object is undefined');
        }
        
        return null;
    }
}


async function update(req, res, next) {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.send("updated");
    } catch (err) {
        console.log(err);
    }
}

async function deleteclass(userId, callback) {
    try {
        console.log('Deleting user with ID:', userId);

       
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log('Invalid user ID');
            return callback({ success: false, message: 'Invalid user ID' });
        }

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            console.log('User not found');
            return callback({ success: false, message: 'User not found' });
        }

        console.log('User deleted successfully');
        callback({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        callback({ success: false, message: 'Internal Server Error' });
    }
}
async function authenticate(data, callback) {
    try {
        const { username, password } = data;
      
        if (!username || !password) {
            return callback({ success: false });
        }
       
        const user = await User.findOne({ username, password });
      
        if (user) {
           
            return callback({ success: true, role: user.role });
        } else {
        
            return callback({ success: false });
        }
    } catch (err) {
        console.log(err);
     
        return callback({ success: false });
    }
}




module.exports = { add, show, update, deleteclass, authenticate };
