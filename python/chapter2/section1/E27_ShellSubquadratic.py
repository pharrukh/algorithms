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
128,Selection,3.00
128,Shell,1.00
256,Selection,3.00
256,Insertion,3.00
256,Shell,1.00
512,Selection,12.00
512,Insertion,9.00
512,Shell,2.00
1024,Selection,44.00
1024,Insertion,36.00
1024,Shell,2.00
2048,Selection,87.00
2048,Insertion,24.00
2048,Shell,4.00
4096,Selection,231.00
4096,Insertion,96.00
4096,Shell,3.00
8192,Selection,849.00
8192,Insertion,342.00
8192,Shell,10.00
16384,Selection,2859.00
16384,Insertion,1585.00
16384,Shell,21.00"""

def draw_decorations():
    """Adds decorations such as rectangles to the plot."""
    fig = plt.gcf()
    ax = plt.gca()
    ax.add_patch(plt.Rectangle((0.01 ,0.98), 0.2, 0.02, facecolor=blue_modern_color, transform=fig.transFigure, clip_on=False, linewidth=0))
    ax.add_patch(plt.Rectangle((0.79, 0.02), 0.2, -0.02, facecolor=green_modern_color, transform=fig.transFigure, clip_on=False, linewidth=0))

# Reading data into a DataFrame
from io import StringIO
df = pd.read_csv(StringIO(data))

# Convert seconds to milliseconds
df['Time'] = df['Time'] * 1000

# Pivot the data for easier plotting
pivot_df = df.pivot(index='Array Size', columns='Algorithm', values='Time')

# Plotting
plt.figure(figsize=(8, 6))
fig = plt.gcf()
fig.patch.set_facecolor(light_coffee_color)

fig.subplots_adjust(left=0.01, right=0.94, top=0.9, bottom=0.12)

ax = plt.gca()
ax.set_facecolor(light_coffee_color)

ax.yaxis.tick_right()
ax.yaxis.set_label_position('right')
ax.tick_params(axis='x', which='both', bottom=False, top=False, pad=.5)
ax.tick_params(axis='y', which='both', left=False, right=False, pad=.5)


# Remove all spines (borders)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['bottom'].set_visible(False)
ax.spines['left'].set_visible(False)

# Color mapping for algorithms
color_map = {
    'Selection': red_modern_color,
    'Insertion': blue_modern_color,
    'Shell': gray_modern_color
}

for algorithm in pivot_df.columns:
    plt.plot(pivot_df.index, pivot_df[algorithm], label=algorithm, color=color_map[algorithm], linewidth=2)
    plt.scatter(pivot_df.index, pivot_df[algorithm], color=color_map[algorithm], s=10)
    # Adding the name in the middle of the graph
    mid_index = len(pivot_df.index) // 2
    mid_x = pivot_df.index[mid_index]
    mid_y = pivot_df[algorithm].iloc[mid_index]
    # Adjusting the text position to avoid overlap
    ax.text(mid_x + 0.1*mid_x, mid_y - 0.3 * mid_y, f'{algorithm}', fontsize=12, color='black', ha='center', va='center', fontfamily='Arial')

plt.xlabel('Collection Size')
plt.ylabel('Time, ms')
plt.title('Sorting algorithms comparison', fontsize=18, loc="left", fontfamily='Arial', fontweight='bold', pad=10)
plt.xscale('log', base=2)  # Set x-axis to base 2
plt.yscale('log')  # Set y-axis to logarithmic scale
plt.grid(True, which='both', axis='x')
plt.grid(which='major', axis='y', linestyle='-', linewidth='0.5')


# Adding source at the bottom left
plt.figtext(0.01, 0.02, 'Source: Farrukh Normuradov', color='gray', ha='left', fontsize=10, fontfamily='Arial')
draw_decorations()

plt.show()
