import pandas as pd
import numpy as np
import csv
import codecs
from collections import defaultdict
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_graphviz
import pickle
from flask import Flask
from flask_restful import Resource, Api
from flask import request

model = pickle.load(open('./MedicalModel.sav', 'rb'))

print(model)


sample_x = [1 if (i in [112, 355, 289, 140]) else 0 for i in range(404)]
sample_x = np.array(sample_x).reshape(1,len(sample_x))
# print('***********',model.predict(sample_x))
print('---->',model.classes_[80])
# tmp = model.predict_proba(sample_x)
# diseases = []
# tmp2= np.argmax(tmp)
# print("*********************",tmp2)


app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        print('--->',request.args[0])
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/api')

if __name__ == '__main__':
    app.run(debug=True, port=2000)