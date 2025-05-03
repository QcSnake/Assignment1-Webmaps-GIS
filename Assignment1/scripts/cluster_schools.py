#!/usr/bin/env python
# coding: utf-8

# In[12]:


import pandas as pd
from sklearn.cluster import KMeans



# In[13]:


# 1. Load your CSV — adjust the path if needed
df = pd.read_csv('school_locations.csv')



# In[14]:





# In[15]:


# 2. Perform K‑means on (latitude, longitude) → here (ycoord, xcoord)
k = 3  # Number of clusters
coords = df[['ycoord', 'xcoord']]
kmeans = KMeans(n_clusters=k, random_state=0).fit(coords)
df['cluster'] = kmeans.labels_

# 3. Write out the new CSV
df.to_csv('school_locations_clustered.csv', index=False)
print("→ Saved: school_locations_clustered.csv (with columns Name, descriptio, xcoord, ycoord, cluster)")


# In[ ]:




