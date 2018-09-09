import numpy as np
import pandas
import pickle

with open("bayesian_models.pickle", "rb") as file:
    data = pickle.load(file)        
    
def calculate_relative_risk(sa3,sex,major_group,family_situation,data):
    # Estimates the relative risk of a person in a given SA3, with given gender and family situation
    # e.g. > calculate_relative_risk(80106,'Female',3,'Single with Dependants',data)
    risk_factor_b25 = data['b25_posterior'][(sa3,family_situation)]/data['non_comp_marginal']
    risk_factor_g57a= data['g57a_posterior'][(sa3,sex,major_group)]/data['non_comp_marginal_g57a']

    return np.sqrt(risk_factor_b25**2 + risk_factor_g57a**2)