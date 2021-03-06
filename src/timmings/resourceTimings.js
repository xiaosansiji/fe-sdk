export default function resourceTimings () {
    const resources = []
    if (window.performance && window.performance.getEntriesByType) {
        const timings = window.performance.getEntriesByType('resource')

        // we can do more cool stuff with resouce timing v2 in the
        // future
        for (const resource of timings) {
            resources.push({
                name: resource.name,
                duration: Number(resource.duration.toFixed(2)),
            })
        }
    }
    return resources
}