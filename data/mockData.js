
export const mockUser = {
    id: "mock-tanishka-id",
    name: "Tanishka",
    avatar: "/tanishka_avatar.png",
    headline: "Full Stack Developer | Building Prodizzy",
    location: "Delhi, India",
    about: "Building improved ways to connect and collaborate. Founder of Prodizzy.",
    socials: {
        linkedin: "https://www.linkedin.com/in/tanishka2712/",
        twitter: "https://x.com/tanishka"
    }
};

export const mockProjects = [
    {
        id: "chordy",
        title: "Chordy",
        description: "AI super-connector",
        about: "Chordy is an AI superconnector that helps people build meaningful professional relationships based on alignment, intent, and shared purpose.\nInstead of shallow networking, Chordy focuses on real compatibility — matching people who truly resonate with each other.",
        tags: ["AI", "Networking", "Professional"],
        likes: 0,
        upvotes: 0,
        comments: 0,
        websiteUrl: "https://chordy.ai",
        socials: {
            website: "https://chordy.ai",
            instagram: "",
            linkedin: ""
        },
        detailsUrl: "/projects/chordy",
        author: {
            name: mockUser.name,
            avatar: mockUser.avatar,
            profileUrl: `/profile/${mockUser.id}`
        },
        joinTeam: true,
        image: "/chordy_logo.jpg",
        timeAgo: "2h ago",
        stage: "Building",
        category: "AI & ML"
    },
    {
        id: "carbonzy",
        title: "Carbonzy",
        description: "An eco-friendly platform",
        about: "Carbonzy makes sustainability rewarding, social, and motivating.\nIt turns climate-positive actions into recognition, pride, and collective momentum — helping people feel excited, not guilty, about taking care of the planet.",
        tags: ["Climate", "Impact", "Community"],
        likes: 0,
        upvotes: 0,
        comments: 0,
        websiteUrl: "",
        socials: {
            website: "",
            instagram: "",
            linkedin: ""
        },
        detailsUrl: "/projects/carbonzy",
        author: {
            name: mockUser.name,
            avatar: mockUser.avatar,
            profileUrl: `/profile/${mockUser.id}`
        },
        joinTeam: true,
        image: "/carbonzy_logo.jpg",
        timeAgo: "1d ago",
        stage: "Ideation",
        category: "Social"
    },
    {
        id: "bluuroom",
        title: "Bluuroom",
        description: "A student community ecosystem",
        about: "Bluuroom is a student community ecosystem built on top of 150+ WhatsApp groups.\nIt helps students find opportunities, events, skill groups, and campus networks — all in one clean, structured platform.",
        tags: ["Community", "Student", "Ecosystem"],
        likes: 0,
        upvotes: 0,
        comments: 0,
        websiteUrl: "https://bluuroom.netlify.app",
        socials: {
            website: "https://bluuroom.netlify.app",
            instagram: "",
            linkedin: ""
        },
        detailsUrl: "/projects/bluuroom",
        author: {
            name: mockUser.name,
            avatar: mockUser.avatar,
            profileUrl: `/profile/${mockUser.id}`
        },
        joinTeam: true,
        image: "/bluuroom_logo.png",
        timeAgo: "2d ago",
        stage: "Live",
        category: "Social"
    }
];
