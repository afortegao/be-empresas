let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let parametrosSchema = new Schema({
    unidadMedidaDefault: { type: Schema.Types.ObjectId, default: '000000000000000000000000' },
    codigoProductoDefault: { type: Schema.Types.ObjectId, default: '000000000000000000000000' },
    //establece el largo de código a utilizar
    largoCodigoProducto: { type: Number, default: 4, maxlength: 20 },
    //establece el ultimo codigo generardo automaticamente
    consecutivoProducto: { type: Number, required: true, default: 0 },
    //establece el descuento máximo que se puede asignar a un producto
    descuentoMaximo: { type: Number, required: true, default: 0 },
    //el código de producto se genera de forma automatica
    generarCodigoProducto: { type: Boolean, default: true },
    //completar el código de producto con 0 al inicio
    completarCodigoProducto: { type: Boolean, default: true },
    //habilita la opcion de controlar el stock minimo del inventario
    controlarStock: { type: Boolean, default: false },
    //habilita registro contable
    contabilidad: { type: Boolean, default: false },
    //aletar de stock negativo
    alertStockNegativo: { type: Boolean, default: false },
    //vender con impuesto incluido
    impuestoIncluido: { type: Boolean, default: false },
    //permite modificar precio en facturacion
    modificarPrecio: { type: Boolean, default: false },
    //define si la categoria es obligatoria al crear el producto
    exigeCategoria: { type: Boolean, default: false },
    //define si la clasificacion es obligatoria al crear el producto
    exigeClasificacion: { type: Boolean, default: false },
    //define si la marca es obligatoria al crear el producto
    exigeMarca: { type: Boolean, default: false },
    //se define el impuesto en la categoria
    impuestoCategoria: { type: Boolean, default: false },
    //extablece el codigo cabys en la clasificacion
    cabysClasificacion: { type: Boolean, default: false },
    //establece otros cargos default
    otrosCargosDefault: { type: Schema.Types.ObjectId, default: '000000000000000000000000' },
    //establece el numero de registros a presentar en la paginacion
    registrosPorPaginaPaginacion: { type: Number, min: 10, max: 100, required: true, default: 10, },
    //establece el numero de paginas que se presentan en la paginacion
    totalPaginasPaginacionVisibles: { type: Number, min: 5, max: 7, required: true, default: 5 },
    //emite factura electrónica cr
    generaFacturaElectronica: { type: Boolean, required: true, default: false },
    //controla el efectivo de la caja
    controlarCaja: { type: Boolean, default: false },
    //permite guardar y modificar pedidos antes de completar el pago
    pedidoAbierto: { type: Boolean, default: false },
    //factura con impuesto incluido
    impuestoIncluido: { type: Boolean, default: false },
});


let documentoElectronicoSchema = new Schema({
    user: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    pin: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    certificado: { type: String, trim: true, required: true },
});

let consecutivoSchema = new Schema({
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

let bodegaSchema = new Schema({
    nombre: { type: String, maxlength: 100, trim: true, required: [true, 'El nombre es necesario'] },
    encargado: { type: String, maxlength: 100, trim: true },
    telefono: { type: String, maxlength: 20, trim: true },
    email: { type: String, maxlength: 160, trim: true },
    direccion: { type: String, maxlength: 160, trim: true },
    usuariosAutorizados: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
    activa: { type: Boolean, required: true, default: true },
    usuarioRegistro: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
});
bodegaSchema.set('timestamps', true);


let agenciaSchema = new Schema({
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
    usuariosAutorizados: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
    activa: { type: Boolean, required: true, default: true },
    usuarioRegistro: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
});
agenciaSchema.set('timestamps', true);

let empresaSchema = new Schema({
    propietario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    identificacion: {
        tipo: { type: Schema.Types.ObjectId, default: '000000000000000000000000' },
        numero: { type: String, trim: true, default: '' }
    },
    nombre: { type: String, maxlength: 100, trim: true, required: true },
    nombreComercial: { type: String, maxlength: 80, trim: true },
    pais: { type: Schema.Types.ObjectId, ref: 'Pais', default: '000000000000000000000000' },
    datosContacto: {
        telefono: { type: String, maxlength: 20, trim: true, default: 0 },
        movil: { type: String, maxlength: 20, trim: true, default: 0 },
        email: { type: String, maxlength: 160, trim: true, default: '' },
        representante: { type: String, maxlength: 100, trim: true, default: '' },
        web: { type: String, maxlength: 100, trim: true, default: '' },
        facebook: { type: String, maxlength: 100, trim: true, default: '' },
        twitter: { type: String, maxlength: 100, trim: true, default: '' },
        instagram: { type: String, maxlength: 100, trim: true, default: '' }
    },
    monedaDefault: { type: Schema.Types.ObjectId, required: true },
    logo: { type: String, trim: true, },
    ejecutivos: [{ type: Schema.Types.ObjectId, ref: 'Personal', default: '000000000000000000000000' }],
    documentoElectronica: { type: documentoElectronicoSchema },
    codigoActividad: [{
        actividad: { type: Schema.Types.ObjectId, ref: 'Actividad', default: '000000000000000000000000' },
        principal: { type: Boolean, default: false }
    }],
    regimenTributario: { type: Schema.Types.ObjectId, ref: 'Regimen', default: '000000000000000000000000' },
    ubicacion: {
        estado: { type: Schema.Types.ObjectId, default: '000000000000000000000000' },
        canton: { type: Schema.Types.ObjectId, default: '000000000000000000000000' },
        distrito: { type: Schema.Types.ObjectId, default: '000000000000000000000000' },
        barrio: { type: Schema.Types.ObjectId, default: '000000000000000000000000' },
        otrasSenas: { type: String, maxlength: 160, default: '' }
    },
    agencias: [{ type: agenciaSchema }],
    parametros: { type: parametrosSchema },
    agenciaDefault: { type: Schema.Types.ObjectId, default: '000000000000000000000000' },
    usuariosAutorizados: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
    activa: { type: Boolean, required: true, default: true },
    usuarioRegistro: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

empresaSchema.index({ 'nombre': 1 }, { collation: { locale: "es", strength: 2 } });
empresaSchema.index({ 'propietario': 1, 'identificacion.numero': 1 }, { unique: true });
empresaSchema.set('timestamps', true);

module.exports = mongoose.model('Empresa', empresaSchema, 'empresas');