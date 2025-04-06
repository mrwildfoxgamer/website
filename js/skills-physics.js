// Improved skills-physics.js

document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if the skills canvas exists
    const skillsCanvas = document.getElementById('skills-canvas');
    if (!skillsCanvas) return;

    // Define your skills with proficiency levels (0-100)
    const skills = [
        { name: 'C/C++', level: 50, icon: 'devicon-cplusplus-plain' },
        { name: 'Java', level: 50, icon: 'devicon-java-plain' },
        { name: 'JavaScript', level: 50, icon: 'devicon-javascript-plain' },
        { name: 'HTML/CSS', level: 50, icon: 'devicon-html5-plain' },
        { name: 'Python', level: 50, icon: 'devicon-python-plain' },
        { name: 'Git', level: 50, icon: 'devicon-git-plain' },
        { name: 'Linux', level: 50, icon: 'devicon-linux-plain' },
        { name: 'Rust', level: 50, icon: 'devicon-rust-plain'}
    ];

    // Initialize Matter.js
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Body = Matter.Body,
          Composite = Matter.Composite,
          Common = Matter.Common,
          Events = Matter.Events;

    // Create engine with reduced gravity
    const engine = Engine.create();
    engine.gravity.y = 0.05;
    engine.gravity.x = 0;

    // Create renderer
    const render = Render.create({
        canvas: skillsCanvas,
        engine: engine,
        options: {
            width: skillsCanvas.parentElement.clientWidth,
            height: skillsCanvas.parentElement.clientHeight,
            wireframes: false,
            background: 'transparent',
            pixelRatio: window.devicePixelRatio
        }
    });

    // Responsive canvas
    function updateCanvasSize() {
        render.options.width = skillsCanvas.parentElement.clientWidth;
        render.options.height = skillsCanvas.parentElement.clientHeight;
        render.canvas.width = render.options.width;
        render.canvas.height = render.options.height;
        
        // Also update the walls when resizing
        updateWalls();
    }

    let walls = [];

    // Function to create and update walls
    function updateWalls() {
        // Remove old walls if they exist
        walls.forEach(wall => Composite.remove(engine.world, wall));
        walls = [];

        const width = render.options.width;
        const height = render.options.height;
        const wallThickness = 50;

        const wallOptions = { 
            isStatic: true, 
            render: { 
                fillStyle: 'transparent',
                strokeStyle: 'transparent'
            },
            friction: 0.1,
            restitution: 0.6
        };

        // Create new walls
        const bottomWall = Bodies.rectangle(width / 2, height + wallThickness / 2, width + 100, wallThickness, wallOptions);
        const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions);
        const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions);
        const topWall = Bodies.rectangle(width / 2, -wallThickness / 2, width + 100, wallThickness, wallOptions);

        walls = [bottomWall, leftWall, rightWall, topWall];
        Composite.add(engine.world, walls);
    }

    // Create skill bodies - circles with icons
    const skillBodies = [];
    const labelElements = [];
    const iconElements = [];

    function createSkillBodies() {
        // Clear existing bodies
        skillBodies.forEach(body => Composite.remove(engine.world, body));
        skillBodies.length = 0;
        
        // Clear existing labels and icons
        labelElements.forEach(label => label.remove());
        labelElements.length = 0;
        iconElements.forEach(icon => icon.remove());
        iconElements.length = 0;

        const width = render.options.width;
        const height = render.options.height;

        skills.forEach((skill, index) => {
            // Calculate size based on skill level (min: 30px, max: 80px)
            const baseSize = 30;
            const sizeRange = 50;
            const radius = baseSize + (skill.level / 100) * sizeRange;
            
            // Position in a grid-like pattern initially
            const cols = Math.ceil(Math.sqrt(skills.length));
            const rows = Math.ceil(skills.length / cols);
            const cellWidth = width / (cols + 1);
            const cellHeight = height / (rows + 1);
            
            const col = index % cols;
            const row = Math.floor(index / cols);
            
            const x = cellWidth * (col + 1);
            const y = cellHeight * (row + 1);
            
            // Create the physics body
            const skillBody = Bodies.circle(x, y, radius, {
                restitution: 0.5, // Bounciness
                friction: 0.5,
                frictionAir: 0.01,
                density: 0.01 * (100 - skill.level + 20), // Lighter objects for higher skills
                label: skill.name,
                render: {
                    fillStyle: `transparent`,
                    strokeStyle: 'transparent',
                    lineWidth: 2
                }
            });
            
            // Add to world
            Composite.add(engine.world, skillBody);
            skillBodies.push(skillBody);
            
            // Create label element for the skill
            const label = document.createElement('div');
            label.classList.add('skill-label');
            label.textContent = skill.name;
            document.getElementById('skills-canvas-container').appendChild(label);
            labelElements.push(label);
            
            // Create icon element
            const icon = document.createElement('i');
            icon.className = `${skill.icon} skill-icon`;
            document.getElementById('skills-canvas-container').appendChild(icon);
            iconElements.push(icon);
            
            // Add some initial gentle force
            Body.setVelocity(skillBody, { 
                x: Common.random(-1, 1), 
                y: Common.random(-1, 1) 
            });
        });
    }

    // Keep bodies inside the canvas
    Events.on(engine, 'afterUpdate', function() {
        const width = render.options.width;
        const height = render.options.height;
        
        skillBodies.forEach(body => {
            const pos = body.position;
            const radius = body.circleRadius;
            
            // Check if the body is outside the canvas boundary and correct it
            if (pos.x - radius < 0) {
                Body.setPosition(body, { x: radius, y: pos.y });
                Body.setVelocity(body, { x: Math.abs(body.velocity.x) * 0.7, y: body.velocity.y * 0.7 });
            }
            if (pos.x + radius > width) {
                Body.setPosition(body, { x: width - radius, y: pos.y });
                Body.setVelocity(body, { x: -Math.abs(body.velocity.x) * 0.7, y: body.velocity.y * 0.7 });
            }
            if (pos.y - radius < 0) {
                Body.setPosition(body, { x: pos.x, y: radius });
                Body.setVelocity(body, { x: body.velocity.x * 0.7, y: Math.abs(body.velocity.y) * 0.7 });
            }
            if (pos.y + radius > height) {
                Body.setPosition(body, { x: pos.x, y: height - radius });
                Body.setVelocity(body, { x: body.velocity.x * 0.7, y: -Math.abs(body.velocity.y) * 0.7 });
            }
        });
    });

    // Update the position of labels and icons to follow the physics bodies
// Update the position of labels and icons to follow the physics bodies
function updateLabelsAndIcons() {
    skillBodies.forEach((body, index) => {
        const pos = body.position;
        const label = labelElements[index];
        const icon = iconElements[index];

        // Position the elements
        if (label) {
            label.style.left = `${pos.x}px`;
             label.style.top = `${pos.y + 35}px`; // Old line
            label.style.fontSize = `${body.circleRadius * 0.3}px`;
        }

        if (icon) {
            icon.style.left = `${pos.x}px`;
        
            icon.style.top = `${pos.y}px`;         // New line: Position vertically centered first
            icon.style.fontSize = `${body.circleRadius * 0.6}px`;
        }
    });

    requestAnimationFrame(updateLabelsAndIcons);
}
    
    // Initialize and start the simulation
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    updateWalls();
    createSkillBodies();
    
    // Start the physics simulation
    Runner.run(engine);
    Render.run(render);
    updateLabelsAndIcons();
    
    // Add mouse interaction
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
    
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;
    
    // Add occasional random impulses to keep things moving
    setInterval(() => {
        skillBodies.forEach(body => {
            if (Math.random() > 0.8) {
                Body.applyForce(body, body.position, {
                    x: Common.random(-0.0005, 0.0005),
                    y: Common.random(-0.0005, 0.0005)
                });
            }
        });
    }, 3000);
    
    // Add a button to regenerate the skill bubbles
    const resetButton = document.createElement('button');
    resetButton.classList.add('btn');
    resetButton.textContent = 'Reset Skills';
    resetButton.style.position = 'absolute';
    resetButton.style.bottom = '0px';
    resetButton.style.right = '0px';
    resetButton.style.zIndex = '100';
    document.getElementById('skills-canvas-container').appendChild(resetButton);
    
    resetButton.addEventListener('click', () => {
        createSkillBodies();
    });
});