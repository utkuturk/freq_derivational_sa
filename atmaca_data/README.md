Data in this folder is taken from Furkan Atmaca's 2020 Bogazici University Master's Thesis titled "Suspended Affixation in Turkish."  All 3 experiments were done in IbexFarm. 

# Experiment 1: Acceptability judgments 

* Full-sentence presentation, masked unbounded acceptability
* 2x9 manipulation
    * Disjunctive vs. Conjuctive coordinator
    * Derivationals
        * -CAsInA, *as if* (düş-er-cesine as if falling)
        * -(I)msI, *like* (kahve-msi coffe-like)
        * -CI, *agent nominalizer* (yalan-cı liar)
        * -(I)ncI, *ordinal* (iki-nci second)
        * -lIk, *-hood/-ity* (düşman-lık enemity)
        * -lI, *with* (sorun-lu troubled/with problems)
        * -sIz, *without/-free* (sorun-suz hassle-free/without problems)
        * -(ş)Ar, *by* (iki-şer two by two)
    * Inflectional: -(y)I *accusative*
* N$_{subject}$ = 214, N$_{item-per-suffix}$ = 3, N$_{trial}$ = 54,  N$_{filler}$ = 54
* Latin square
* `acceptability_df.rds` is the processed dataframe. 14% of the trials is excluded.
    * 9 participants are excluded due to overall filler accuracy lower than 70%.
    * Trials that were answered faster than 2 seconds.
    * Trials that were answered slower than 20 seconds.
