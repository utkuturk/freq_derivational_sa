import pandas as pd 

data = pd.read_csv("freqs.csv")

'''
Coord = frequency of 'first.conjunct(stem) and second.conjunct(stem)'
C1 = frequency of 'first.conjunct(stem)'
C1andN = frequency of 'first.conjunct(stem) and any.noun(stem)'
and so on accordingly

'''

data['PMI'] = data.apply(lambda row: (row.Coord / (row.C1 * row.C2))*1000000, axis = 1)
data['cPMI'] = data.apply(lambda row: (row.Coord / (row.C1andN * row.NandC2))*1000000, axis = 1)
data['csumPMI'] = data.apply(lambda row: ((row.Coord + row.CoordRev) / ((row.C1andN + row.NandC1) * 
                                                       (row.NandC2 + row.C2andN))*1000000), axis = 1)

nums = data[['Coord', 'PMI', 'cPMI', 'csumPMI']]
print(nums.corr())

'''
            Coord       PMI      cPMI   csumPMI
Coord    1.000000  0.167693 -0.053314 -0.033975
PMI      0.167693  1.000000  0.492646  0.540839
cPMI    -0.053314  0.492646  1.000000  0.985288
csumPMI -0.033975  0.540839  0.985288  1.000000

cPMI and csumPMI are strongly correlated
PMI is moderately correlated with cPMI and csumPMI
Coord is quite different

'''

data.to_csv('finalfreqs.csv')