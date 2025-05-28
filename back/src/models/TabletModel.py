from config.dbConfig import db

class Tablet (db.Model):
    __tablename__ = 'tablets'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    serial = db.Column(db.String(50), nullable=False)
    marca = db.Column(db.String(50), nullable=False)
    tamaño = db.Column(db.Float, nullable=False) 
    precio = db.Column(db.Float, nullable=False)  
    almacenamiento = db.Column(db.String(50), nullable=False)
    peso = db.Column(db.Float, nullable=False)
    disponible = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            'id': self.id,
            'serial': self.serial,
            'marca': self.marca,
            'tamaño': self.tamaño,
            'precio': self.precio,
            'almacenamiento': self.almacenamiento,
            'peso': self.peso,
            'disponible': self.disponible,
        }
