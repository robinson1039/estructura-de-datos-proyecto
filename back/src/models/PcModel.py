from config.dbConfig import db

class Pcs (db.Model):
    __tablename__ = 'pcs'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    serial = db.Column(db.String(50), nullable=False)
    marca = db.Column(db.String(50), nullable=False)
    tamaño = db.Column(db.Float, nullable=False) 
    precio = db.Column(db.Float, nullable=False)  
    sistema_operativo = db.Column(db.String(50), nullable=False)
    procesador = db.Column(db.String(50), nullable=False)
    disponible = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            'id': self.id,
            'serial': self.serial,
            'marca': self.marca,
            'tamaño': self.tamaño,
            'precio': self.precio,
            'sistema_operativo': self.sistema_operativo,
            'procesador': self.procesador,
            'disponible': self.disponible,
        }
