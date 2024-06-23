module.exports = (sequelize, Sequelize) => {
    const CertificateData = sequelize.define("Certificate_Data", {
        certificate_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        business_relation_id: {
            type: Sequelize.INTEGER
        },
        standard_id: {
            type: Sequelize.INTEGER
        },
        other_standard_id: {
            type: Sequelize.INTEGER
        },
        industry_code_id: {
            type: Sequelize.INTEGER
        },
        date_of_issue: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        valid_until: {
            type: Sequelize.STRING
        },
        sort_name: {
            type: Sequelize.STRING
        },
        date_of_first_issue: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        main_certificate_id: {
            type: Sequelize.INTEGER
        },
        owner_business_relation_id: {
            type: Sequelize.INTEGER
        },
        publishing_enable: {
            type: Sequelize.STRING
        },
        is_excerpt: {
            type: Sequelize.STRING
        },
        is_main_certificate: {
            type: Sequelize.STRING
        },
        status_id: {
            type: Sequelize.INTEGER
        },
        pdf_download: {
            type: Sequelize.STRING
        },
        iaif_number: {
            type: Sequelize.INTEGER
        },
        unit_id: {
            type: Sequelize.INTEGER
        },
        accredition_id: {
            type: Sequelize.INTEGER
        },
        registration_id: {
            type: Sequelize.INTEGER
        },
        date_varified: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        }
    })
    return CertificateData;
}