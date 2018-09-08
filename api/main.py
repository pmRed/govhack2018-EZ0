import numpy as np
import pandas
import pickle

with open("bayesian_models.pickle", "rb") as file:
    data = pickle.load(file)

def calculate_relative_risk(sa3,sex,major_group,family_situation):
    # Estimates the relative risk of a person in a given SA3, with given gender and family situation
    # e.g. > calculate_relative_risk(80106,'Female',3,'Single with Dependants',data)
    risk_factor_b25 = data['b25_posterior'][(sa3,family_situation)]/data['non_comp_marginal']
    risk_factor_g57a= data['g57a_posterior'][(sa3,sex,major_group)]/data['non_comp_marginal_g57a']

    return np.sqrt(risk_factor_b25**2 + risk_factor_g57a**2) / np.sqrt(2)

### YEAH LETS JUST DO THAT.

from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route("/calculaterisk")
def calculaterisk():
    sa3 = request.args.get('sa3')
    sex = request.args.get('sex')
    majorGroup = request.args.get('majorGroup')
    familySituation = request.args.get('familySituation')
    riskfactor = calculate_relative_risk(int(sa3), sex, int(majorGroup), familySituation)
    return json.dumps({"riskfactor" : riskfactor})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5500, threaded=True, debug=True)
