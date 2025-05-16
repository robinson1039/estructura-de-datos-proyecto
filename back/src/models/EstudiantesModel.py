from config.dbConfig import db


class Estudiante(db.Model):
    __tablename__ = 'estudiantes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cedula = db.Column(db.String(50), nullable=False)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    telefono = db.Column(db.String(50), nullable=False)
    semestre_actual = db.Column(db.Integer, nullable=True)
    promedio_acumulado = db.Column(db.Float, nullable=True)
    serial = db.Column(db.String(50), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'cedula': self.cedula,
            'nombre': self.nombre,
            'apellido': self.apellido,
            'telefono': self.telefono,
            'semestre_actual': self.semestre_actual,
            'promedio_acumulado': self.promedio_acumulado,
            'serial': self.serial
        }
