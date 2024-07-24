import pandas as pd
import matplotlib.pyplot as plt

# Configuration for plot appearance
plt.rcParams['font.family'] = 'Arial'

# Colors
light_coffee_color = (239/255, 224/255, 185/255)
yellow_color = (255/255, 255/255, 0/255)
red_modern_color = (231/255, 76/255, 60/255)
green_modern_color = (0/255, 158/255, 96/255)
emerald_green_color = (80/255, 200/255, 120/255)
black_modern_color = (44/255, 62/255, 80/255)
gray_modern_color = (149/255, 165/255, 166/255)
blue_modern_color = (0/255, 120/255, 210/255)
white_modern_color = (220/255, 220/255, 220/255)

# Sample data
data = """Array Size,Algorithm,Time
128,Selection,0.00300
128,Insertion,0.00000
128,Shell,0.00100
256,Selection,0.00300
256,Insertion,0.00300
256,Shell,0.00100
512,Selection,0.01200
512,Insertion,0.00900
512,Shell,0.00200
1024,Selection,0.04400
1024,Insertion,0.03600
1024,Shell,0.00200
2048,Selection,0.08700
2048,Insertion,0.02400
2048,Shell,0.00400
4096,Selection,0.23100
4096,Insertion,0.09600
4096,Shell,0.00300
8192,Selection,0.84900
8192,Insertion,0.34200
8192,Shell,0.01000
16384,Selection,2.85900
16384,Insertion,1.58500
16384,Shell,0.02100"""

# Reading data into a DataFrame
from io import StringIO
df = pd.read_csv(StringIO(data))

# Pivot the data for easier plotting
pivot_df = df.pivot(index='Array Size', columns='Algorithm', values='Time')

# Plotting
plt.figure(figsize=(10, 6))
fig = plt.gcf()
fig.patch.set_facecolor(light_coffee_color)
ax = plt.gca()
ax.set_facecolor(light_coffee_color)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_visible(False)
ax.spines['bottom'].set_position('zero')
ax.yaxis.set_visible(False)
plt.subplots_adjust(left=0.01, right=0.99, top=0.85, bottom=0.13)

# Color mapping for algorithms
color_map = {
    'Selection': red_modern_color,
    'Insertion': green_modern_color,
    'Shell': blue_modern_color
}

for algorithm in pivot_df.columns:
    plt.plot(pivot_df.index, pivot_df[algorithm], marker='o', label=algorithm, color=color_map[algorithm])
    for x, y in zip(pivot_df.index, pivot_df[algorithm]):
        ax.text(x, y, f'{algorithm}', fontsize=10, color=color_map[algorithm])

plt.xlabel('Array Size')
plt.ylabel('Time (seconds)')
plt.title('Sorting Algorithm Performance')
# Removed the legend
plt.grid(True)
plt.yscale('log')
plt.show()
