from config.dbConfig import db

class DesignStudents(db.Model):
    __tablename__ = 'designStudents'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cedula = db.Column(db.String(50), nullable=False)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    telefono = db.Column(db.String(50), nullable=False)
    modalidad_de_estudio = db.Column(db.String(50), nullable=True)
    cantidad_asignaturas = db.Column(db.Integer, nullable=True)
    FK_serial = db.Column(db.String(50), db.ForeignKey('tablets.serial'), nullable=True)
    tablet_asignado = db.Column(db.Boolean, default=False)
    

    def to_dict(self):
        return {
            'id': self.id,
            'cedula': self.cedula,
            'nombre': self.nombre,
            'apellido': self.apellido,
            'telefono': self.telefono,
            'modalidad_de_estudio': self.modalidad_de_estudio,
            'cantidad_asignaturas': self.cantidad_asignaturas,
            'FK_serial': self.FK_serial,
            'tablet_asignado': self.tablet_asignado
        }