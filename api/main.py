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


### Marginal distributions
def calculate_prob_noncompliance_sa3(sa3,use_norm):
    out = data['b25_posterior_SA3_only'][sa3]
    if use_norm == True:
        out = out/max(data['b25_posterior_SA3_only'].values())
    return out

def calculate_prob_noncompliance_family(sa3,use_norm):
    out = data['b25_posterior_FS_only'][sa3]
    if use_norm == True:
        out = out/max(data['b25_posterior_FS_only'].values())
    return out

def calculate_prob_noncompliance_sex(sa3,use_norm):
    out = data['g57a_posterior_sex_only'][sa3]
    if use_norm == True:
        out = out/max(data['g57a_posterior_sex_only'].values())
    return out

def calculate_prob_noncompliance_majGroup(sa3,use_norm):
    out = data['g57a_posterior_majGroup_only'][sa3]
    if use_norm == True:
        out = out/max(data['g57a_posterior_majGroup_only'].values())
    return out

### YEAH LETS JUST DO THAT.

from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route("/calculaterisk")
def calculaterisk():
    help = request.args.get('help')
    if (help == "me"):
        return "{}?sa3=80105&sex=Female&majorGroup=3&familySituation=Single%20with%20Dependants".format(request.base_url)
    sa3 = request.args.get('sa3')
    sex = request.args.get('sex')
    majorGroup = request.args.get('majorGroup')
    familySituation = request.args.get('familySituation')
    riskfactor = calculate_relative_risk(int(sa3), sex, int(majorGroup), familySituation)
    return json.dumps({"riskfactor" : riskfactor})

@app.route("/calculate_prob_sa3")
def calculate_prob_sa3():
    help = request.args.get('help')
    if (help == "me"):
        return "{}?sa3=80105&useNorm=True".format(request.base_url)
    sa3 = request.args.get('sa3')
    useNorm = request.args.get('useNorm')
    prob = calculate_prob_noncompliance_sa3(int(sa3),useNorm)
    return json.dumps({"probability" : prob})

@app.route("/calculate_prob_family")
def calculate_prob_family():
    help = request.args.get('help')
    if (help == "me"):
        return "{}?familySituation=Single%20with%20Dependants&useNorm=True".format(request.base_url)
    familySituation = request.args.get('familySituation')
    useNorm = request.args.get('useNorm')
    prob = calculate_prob_noncompliance_family(familySituation,useNorm)
    return json.dumps({"probability" : prob})

@app.route("/calculate_prob_sex")
def calculate_prob_sex():
    help = request.args.get('help')
    if (help == "me"):
        return "{}?sex=Female&useNorm=True".format(request.base_url)
    sex = request.args.get('sex')
    useNorm = request.args.get('useNorm')
    prob = calculate_prob_noncompliance_sex(sex,useNorm)
    return json.dumps({"probability" : prob})


@app.route("/calculate_prob_majorGroup")
def calculate_prob_occupation():
    help = request.args.get('help')
    if (help == "me"):
        return "{}?majorGroup=3&useNorm=True".format(request.base_url)
    majorGroup = request.args.get('majorGroup')
    useNorm = request.args.get('useNorm')
    prob = calculate_prob_noncompliance_majGroup(int(majorGroup),useNorm)
    return json.dumps({"probability" : prob})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5500, threaded=True, debug=True)
