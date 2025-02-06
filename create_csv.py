import pandas as pd

def add_suffix(word, suffix):
    vowels = "aeıioöuü"
    last_vowel = next((v for v in reversed(word) if v in vowels), "")
    last_char = word[-1]

    if suffix == "lik":
        if last_vowel in "ei": return word + "lik"
        elif last_vowel in "aı": return word + "lık"
        elif last_vowel in "ou": return word + "luk"
        elif last_vowel in "öü": return word + "lük"

    elif suffix == "siz":
        if last_vowel in "ei": return word + "siz"
        elif last_vowel in "aı": return word + "sız"
        elif last_vowel in "ou": return word + "suz"
        elif last_vowel in "öü": return word + "süz"

    elif suffix in ("ca", "ci"):
        soft_consonants = "pçtkşhf"
        if last_char in soft_consonants:
            if suffix == "ca":
                return word + ("çe" if last_vowel in "eiöü" else "ça")
            else:
                return word + ("çi" if last_vowel in "ei" else "çı" if last_vowel in "aı" else "çu" if last_vowel in "ou" else "çü")
        else:
            if suffix == "ca":
                return word + ("ce" if last_vowel in "eiöü" else "ca")
            else:
                return word + ("ci" if last_vowel in "ei" else "cı" if last_vowel in "aı" else "cu" if last_vowel in "ou" else "cü")

    return word + suffix


df = pd.read_csv("selected_binomials.csv")

df[['NP1', 'CONJ', 'NP2']] = df['turkish_base'].str.split(expand=True)

suffixes = ["lik", "siz", "ca", "ci"]

for suffix in suffixes:
    df[f'NP1_{suffix[0:]}'] = df['NP1'].apply(add_suffix, suffix=suffix)
    df[f'NP2_{suffix[0:]}'] = df['NP2'].apply(add_suffix, suffix=suffix)
    df[f'{suffix[0:]}'] = df[f'NP1_{suffix[0:]}'] + ' ve ' + df[f'NP2_{suffix[0:]}']
    df[f'sa_{suffix[0:]}'] = df[f'NP1'] + ' ve ' + df[f'NP2_{suffix[0:]}']

combined_cols = ['english']
for suffix in suffixes:
    combined_cols.append(f'{suffix[0:]}')
    combined_cols.append(f'sa_{suffix[0:]}')

new_df = df[combined_cols]

new_df.to_csv('./selected_binomials_suffixed.csv', index=False)
