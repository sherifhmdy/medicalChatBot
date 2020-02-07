from flask import Flask, escape, request, jsonify
import pandas as pd
import numpy as np
import csv
import codecs
from collections import defaultdict
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_graphviz
import pickle
import heapq


app = Flask(__name__)

@app.route('/', methods=['POST'])
def hello():
    # data1="{'mod1':'23','mod2':'123'}"
    data = request.get_json()
    username=data['username']
    mlist=username.split(',')
    print(mlist)
    # userID=data['userId']
    lst=[]
    lst2=['ahmed','mahmoud','mohamed']
    item={}
    for i in range(3):
        item={i:lst2}
        lst.append(item)
    return jsonify(lst)
    # name = request.args.get("name", "World")
    # return f'Hello, {escape(name)}!'




@app.route('/getSymptoms', methods=['POST'])
def getSymptoms():
    initSymptoms=request.get_json()
    print(initSymptoms)
    initSymptomsList=initSymptoms['symptoms'].split(',')
    symLst=symptomsModel(initSymptomsList)
    result={'Symptoms':symLst}
        
    return jsonify(result)

@app.route('/getDisease', methods=['POST'])
def getDisease():
    initSymptoms=request.get_json()
    print(initSymptoms)
    initSymptomsList=initSymptoms['symptoms'].split(',')
    disease=diseaseModel(initSymptomsList)
    print('before result')
    print('pred type: ',type(disease))
    result={'Disease':disease}
    print('after result')
    return jsonify(result)


def symptomsModel(symptoms):
    symList=[]
    model = pickle.load(open('./MedicalModel.sav', 'rb'))
    df_pivoted = pd.read_csv("./df_pivoted.csv", encoding ="ISO-8859-1")
    clean_df=pd.read_csv('./dataset_clean.csv').dropna()
    symptom_count_df=pd.read_csv('./Disease Symptom Counts.csv')
    

    # df_pivoted = df_pivoted.drop(df_pivoted.columns[0], axis=1)
    features = df_pivoted.columns[1:]
    feature_dict = {}
    for i,f in enumerate(features):
        feature_dict[f] = i
    
    symFeaturesIdx=[]
    for i in symptoms:
        symFeaturesIdx.append(feature_dict[i])
    print(symFeaturesIdx)
    print('en(features)',len(features))
    sample_x = [1 if (i in symFeaturesIdx) else 0 for i in range(len(features))]
    sample_x = np.array(sample_x).reshape(1,len(sample_x))
    predictons = model.predict_proba(sample_x)
    print('predictions',predictons)
    topDiseasesIDx=(-predictons[0]).argsort()[:3]
    print('top idx',topDiseasesIDx)
    topDiseases=[]
    for i in topDiseasesIDx:
        print(' ------>', i)
        topDiseases.append(model.classes_[i])
    print(topDiseases)

    newSymps=[]
    for item in topDiseases:
        df=symptom_count_df[symptom_count_df['Disease']==item]
        count=0
        for index, row in df.iterrows():
            if row['Symptom'] not in symptoms and count<4:
                count=count+1
                print('count ',count)
                newSymps.append(row['Symptom'])


    return newSymps



def diseaseModel(symptoms):
    symList=[]
    model = pickle.load(open('./MedicalModel.sav', 'rb'))
    df_pivoted = pd.read_csv("./df_pivoted.csv", encoding ="ISO-8859-1")
    clean_df=pd.read_csv('./dataset_clean.csv').dropna()
    symptom_count_df=pd.read_csv('./Disease Symptom Counts.csv')
    
    features = df_pivoted.columns[1:]
    feature_dict = {}
    for i,f in enumerate(features):
        feature_dict[f] = i
    
    symFeaturesIdx=[]
    for i in symptoms:
        symFeaturesIdx.append(feature_dict[i])
    print(symFeaturesIdx)
    print('en(features)',len(features))
    sample_x = [1 if (i in symFeaturesIdx) else 0 for i in range(len(features))]
    sample_x = np.array(sample_x).reshape(1,len(sample_x))
    predictons = model.predict(sample_x)
    print('prediction',predictons[0])
    
    return predictons[0]




if __name__ == '__main__':
    app.run(debug=False, port=5000)