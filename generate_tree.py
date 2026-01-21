import os

def generate_tree(dir_path, prefix="", exclude_dirs=None):
    if exclude_dirs is None:
        exclude_dirs = set()
    
    output = ""
    
    try:
        entries = os.listdir(dir_path)
    except PermissionError:
        return ""
        
    # Filter and sort
    filtered_entries = []
    for entry in entries:
        if entry in exclude_dirs or entry.startswith('.'):
            continue
        filtered_entries.append(entry)
    
    filtered_entries.sort()
    
    entries_count = len(filtered_entries)
    
    for i, entry in enumerate(filtered_entries):
        path = os.path.join(dir_path, entry)
        is_last = (i == entries_count - 1)
        
        # Determine connector
        connector = "└── " if is_last else "├── "
        
        # Add to output
        output += f"{prefix}{connector}{entry}\n"
        
        if os.path.isdir(path):
            extension = "    " if is_last else "│   "
            output += generate_tree(path, prefix + extension, exclude_dirs)
            
    return output

if __name__ == "__main__":
    # Print root
    print(os.path.basename(os.getcwd()) + "/")
    print(generate_tree(".", exclude_dirs={'node_modules', '.git', '.next', 'dist', 'build', '__pycache__'}))
