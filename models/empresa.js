var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentoElectronicoSchema = new Schema({
    user: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    pin: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    certificado: { type: String, trim: true, required: true },
});

var consecutivoSchema = new Schema({
    facturaElectronica: { type: Number, required: true, default: 0 },
    notaCreditoElectronica: { type: Number, required: true, default: 0 },
    notaDebitoElectronica: { type: Number, required: true, default: 0 },
    facturaCompraElectronica: { type: Number, required: true, default: 0 },
    facturaExportacionElectronica: { type: Number, required: true, default: 0 },
    tiqueteElectronico: { type: Number, required: true, default: 0 },
    aceptacionDocumentoElectrinico: { type: Number, required: true, default: 0 },
    proforma: { type: Number, required: true, default: 0 },
    reciboCuentaCobrar: { type: Number, required: true, default: 0 },
    ncCuentaCobrar: { type: Number, required: true, default: 0 },
    ndCuentaCobrar: { type: Number, required: true, default: 0 },
    asientos: { type: Number, required: true, default: 0 },
    movimientoInventario: { type: Number, required: true, default: 0 },
});

var bodegaSchema = new Schema({
    nombre: { type: String, maxlength: 100, trim: true, required: [true, 'El nombre es necesario'] },
    encargado: { type: String, maxlength: 100, trim: true },
    telefono: { type: String, maxlength: 20, trim: true },
    email: { type: String, maxlength: 160, trim: true },
    direccion: { type: String, maxlength: 160, trim: true },
    usuarios:[{type: Schema.Types.ObjectId,ref:'Usuario'}],
    activa: { type: Boolean, required: true, default: true },
    usuarioRegistro: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
});
bodegaSchema.set('timestamps', true);


var agenciaSchema = new Schema({
    nombre: { type: String, maxlength: 100, trim: true, required: [true, 'El nombre es necesario'] },
    numeroAgencia: { type: String, maxlength: 3, minlength: 3, trim: true, required: true },
    encargado: { type: String, maxlength: 100, trim: true },
    telefono: { type: String, maxlength: 20, trim: true },
    movil: { type: String, maxlength: 20, trim: true },
    email: { type: String, maxlength: 160, trim: true },
    direccion: { type: String, maxlength: 160 },
    monedaFacturacion: { type: Schema.Types.ObjectId, required: true },
    tiket: { type: Schema.Types.ObjectId, ref: 'Tiket' },
    bodegaDefault: { type: Schema.Types.ObjectId, ref: 'Bodegas' },
    consecutivos: { type: consecutivoSchema },
    bodegas: [{ type: bodegaSchema }],
    usuarios:[{type: Schema.Types.ObjectId,ref:'Usuario'}],
    activa: { type: Boolean, required: true, default: true },
    usuarioRegistro: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
});
agenciaSchema.set('timestamps', true);

var empresaSchema = new Schema({
    propietario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    nombre: { type: String, maxlength: 100, trim: true, required: true },
    nombreComercial: { type: String, maxlength: 80, trim: true },
    tipoIdentificacion: { type: Schema.Types.ObjectId, default: '000000000000000000000000' },
    identificacion: { type: String, trim: true },
    pais: { type: Schema.Types.ObjectId,ref:'Pais', default: '000000000000000000000000'  },
    telefono: { type: String, maxlength: 20, trim: true, default: 0 },
    movil: { type: String, maxlength: 20, trim: true, default: 0 },
    email: { type: String, maxlength: 160, trim: true },
    representante: { type: String, maxlength: 100, trim: true },
    web: { type: String, maxlength: 100, trim: true },
    facebook: { type: String, maxlength: 100, trim: true },
    twitter: { type: String, maxlength: 100, trim: true },
    instagram: { type: String, maxlength: 100, trim: true },
    monedaDefault: { type: Schema.Types.ObjectId, required: true },
    logo: { type: String, trim: true, },
    ejecutivos: [{ type: Schema.Types.ObjectId,ref:'Personal', default: '000000000000000000000000'}],
    documentoElectronica: { type: documentoElectronicoSchema },
    codigoActividad: { type: Schema.Types.ObjectId, ref: 'Actividad', default: '000000000000000000000000' },
    regimenTributario: { type: Schema.Types.ObjectId, ref: 'Regimen', default: '000000000000000000000000' },
    estado: { type: Schema.Types.ObjectId, default: '000000000000000000000000' },
    canton: { type: Schema.Types.ObjectId, default: '000000000000000000000000' },
    distrito: { type: Schema.Types.ObjectId, default: '000000000000000000000000' },
    barrio: { type: Schema.Types.ObjectId, default: '000000000000000000000000' },
    agenciaDefault: { type: Schema.Types.ObjectId, default: '000000000000000000000000' },
    otrasSenas: { type: String, maxlength: 160 },
    agencias: [{ type: agenciaSchema }],
    //emite factura electrónica cr
    generaFacturaElectronica: { type: Boolean, required: true, default: false },
    //controla el efectivo de la caja
    controlarCaja: { type: Boolean, default: false },
    //permite guardar y modificar pedidos antes de completar el pago
    pedidoAbierto: { type: Boolean, default: false },
    //factura con impuesto incluido
    impuestoIncluido: { type: Boolean, default: false },
    usuarios:[{type: Schema.Types.ObjectId,ref:'Usuario'}],
    activa: { type: Boolean, required: true, default: true },
    usuarioRegistro: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

empresaSchema.index({ 'nombre': 1 }, { collation: { locale: "es", strength: 2 } });
empresaSchema.index({ 'cedula': 1 });
empresaSchema.index({ 'propietario': 1 });
empresaSchema.set('timestamps', true);

module.exports = mongoose.model('Empresa', empresaSchema, 'empresas');