class Step {
    constructor(title, description, base64Image, status) {
        this.title = title;
        this.description = description;
        this.base64Image = base64Image
        this.status = status
    }

    getTitle() {
        return this.title
    }

    getDescription() {
        return this.description
    }

    getBase64Image() {
        return this.base64Image
    }

    getStatus() {
        return this.status
    }
}

module.exports = Step