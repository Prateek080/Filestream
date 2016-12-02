var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EquipmentSchema = new Schema({
    equipmentId: {
        type: Number
    },
    position: {
        type: Number
    }
});
module.exports = mongoose.model('equipment', EquipmentSchema);
