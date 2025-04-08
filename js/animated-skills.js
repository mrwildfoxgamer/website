// animated-skills.js
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if the skills container exists
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) return;

    // Define your skills with proficiency levels (0-100)
    const skills = [
        { name: 'C/C++', level: 85, icon: 'devicon-cplusplus-plain', description: 'Systems programming, performance optimization' },
        { name: 'Java', level: 80, icon: 'devicon-java-plain', description: 'Enterprise applications, Android development' },
        { name: 'JavaScript', level: 90, icon: 'devicon-javascript-plain', description: 'Web development, front-end frameworks' },
        { name: 'HTML/CSS', level: 95, icon: 'devicon-html5-plain', description: 'Responsive design, web accessibility' },
        { name: 'Python', level: 85, icon: 'devicon-python-plain', description: 'Data analysis, automation, scripting' },
        { name: 'Git', level: 75, icon: 'devicon-git-plain', description: 'Version control, collaboration' },
        { name: 'Linux', level: 70, icon: 'devicon-linux-plain', description: 'System administration, shell scripting' },
        { name: 'Rust', level: 65, icon: 'devicon-rust-plain', description: 'Memory-safe systems programming' }
    ];

    // Create skill elements
    skills.forEach(skill => {
        // Create main container for each skill
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item';
        
        // Create icon container with level indicator
        const iconContainer = document.createElement('div');
        iconContainer.className = 'skill-icon-container';
        
        // Create actual icon
        const icon = document.createElement('i');
        icon.className = `${skill.icon} skill-icon`;
        iconContainer.appendChild(icon);
        
        // Create circular progress indicator
        const progressCircle = document.createElement('svg');
        progressCircle.className = 'progress-circle';
        progressCircle.setAttribute('viewBox', '0 0 120 120');
        
        // Background circle
        const bgCircle = document.createElement('circle');
        bgCircle.setAttribute('cx', '60');
        bgCircle.setAttribute('cy', '60');
        bgCircle.setAttribute('r', '54');
        bgCircle.className = 'progress-circle-bg';
        
        // Progress circle - stroke-dasharray and stroke-dashoffset will be animated
        const progressPath = document.createElement('circle');
        progressPath.setAttribute('cx', '60');
        progressPath.setAttribute('cy', '60');
        progressPath.setAttribute('r', '54');
        progressPath.className = 'progress-circle-path';
        // Calculate dash offset based on skill level (339.292 is approx circumference of circle with r=54)
        const circumference = 2 * Math.PI * 54;
        const offset = circumference - (skill.level / 100) * circumference;
        progressPath.style.strokeDasharray = `${circumference} ${circumference}`;
        progressPath.style.strokeDashoffset = circumference; // Start at 0%
        
        progressCircle.appendChild(bgCircle);
        progressCircle.appendChild(progressPath);
        iconContainer.appendChild(progressCircle);
        
        // Create skill name
        const skillName = document.createElement('div');
        skillName.className = 'skill-name';
        skillName.textContent = skill.name;
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        
        // Tooltip content
        const tooltipHeader = document.createElement('div');
        tooltipHeader.className = 'tooltip-header';
        tooltipHeader.textContent = skill.name;
        
        const tooltipLevel = document.createElement('div');
        tooltipLevel.className = 'tooltip-level';
        tooltipLevel.textContent = `Proficiency: ${skill.level}%`;
        
        const tooltipDesc = document.createElement('div');
        tooltipDesc.className = 'tooltip-description';
        tooltipDesc.textContent = skill.description;
        
        tooltip.appendChild(tooltipHeader);
        tooltip.appendChild(tooltipLevel);
        tooltip.appendChild(tooltipDesc);
        
        // Assemble the skill element
        skillElement.appendChild(iconContainer);
        skillElement.appendChild(skillName);
        skillElement.appendChild(tooltip);
        
        // Add to container
        skillsContainer.appendChild(skillElement);
        
        // Add animation with slight delay based on index
        setTimeout(() => {
            // Animate the progress circle
            progressPath.style.strokeDashoffset = offset;
            // Add loaded class for entrance animation
            skillElement.classList.add('loaded');
        }, 100 * skills.indexOf(skill));
        
        // Add hover event for additional animations
        skillElement.addEventListener('mouseenter', () => {
            skillElement.classList.add('hover');
        });
        
        skillElement.addEventListener('mouseleave', () => {
            skillElement.classList.remove('hover');
        });
    });
});