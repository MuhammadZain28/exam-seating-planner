#!/usr/bin/env python3
"""
Script to sort CSV files by Student_ID in natural order using pandas
(2024-CS-1, 2024-CS-2, 2024-CS-3... instead of 2024-CS-1, 2024-CS-10, 2024-CS-11...)
"""

import pandas as pd
import re
from pathlib import Path

def extract_sort_key(student_id):
    """
    Extract numeric parts from Student_ID for natural sorting.
    Example: '2025-CS-123' -> (2025, 123)
    """
    # Extract year and number parts
    match = re.match(r'(\d+)-([A-Z]+)-(\d+)', student_id)
    if match:
        year = int(match.group(1))
        letters = match.group(2)
        number = int(match.group(3))
        return (year, letters, number)
    return (0, '', 0)

def sort_csv_file(input_file, output_file=None):
    """
    Sort a CSV file by Student_ID in natural order using pandas.
    
    Args:
        input_file: Path to input CSV file
        output_file: Path to output CSV file (defaults to input_file)
    """
    
    if output_file is None:
        output_file = input_file
    
    try:
        # Read CSV file with pandas
        df = pd.read_csv(input_file)
        
        # Create a sort key column
        df['_sort_key'] = df['reg'].apply(extract_sort_key)
        
        # Sort by the key
        df = df.sort_values(by='_sort_key')
        
        # Drop the temporary sort key column
        df = df.drop('_sort_key', axis=1)
        
        # Reset index
        df = df.reset_index(drop=True)
        
        # Save to CSV
        df.to_csv(output_file, index=False)
        
        print(f"✓ Sorted {len(df)} records from {input_file}")
        print(f"✓ Output saved to {output_file}")
        
        # Show first and last few entries
        print(f"\nFirst 5 entries:")
        for idx, student_id in enumerate(df['reg'].head(5), 1):
            print(f"  {idx}. {student_id}")
        
        print(f"\nLast 5 entries:")
        for idx, student_id in enumerate(df['reg'].tail(5), len(df)-4):
            print(f"  {idx}. {student_id}")
    
    except FileNotFoundError:
        print(f"Error: File '{input_file}' not found")
    except KeyError as e:
        print(f"Error: 'reg' column not found in CSV - {e}")
    except Exception as e:
        print(f"Error: {e}")

def sort_multiple_files(file_list):
    """
    Sort multiple CSV files at once.
    
    Args:
        file_list: List of CSV file paths
    """
    print("=" * 60)
    print("SORTING MULTIPLE CSV FILES")
    print("=" * 60 + "\n")
    
    for file in file_list:
        if Path(file).exists():
            print(f"\nProcessing: {file}")
            sort_csv_file(file)
        else:
            print(f"Warning: {file} not found")

def main():
    """Main function"""
    
    print("=" * 60)
    print("CSV STUDENT ID SORTER (Using Pandas)")
    print("=" * 60 + "\n")
    
    choice = input("Sort (1) Single file or (2) Multiple files? (1/2): ").strip()
    
    if choice == '1':
        input_file = input("\nEnter CSV filename to sort (e.g., Calculus-Morning.csv): ").strip()
        if input_file:
            sort_csv_file(input_file)
        else:
            print("No file specified.")
    
    elif choice == '2':
        csv_files = [
            'Calculus-Morning.csv',
            'Calculus-Afternoon.csv',
            'FE-AC.csv',
            'FE-B.csv',
            'FE-D.csv'
        ]
        sort_multiple_files(csv_files)
    
    else:
        print("Invalid choice. Please enter 1 or 2.")

if __name__ == "__main__":
    main()