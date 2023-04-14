const pattern = /^(#\w+)\s(\[[a-zA-Z_. ]+\])\:\s(.+)$/;

const typeEnum = ['#FEAT', '#FIX', '#REF', '#HOTFIX', '#WIP'];
const defaultErrorMessage = 'Commit valid format: "#TYPE [Scope]: Subject"';
let validationErrorMessage = '';
const validateConcreteString = (val) => {
    if (!val.length) return true;

    const isPatternValid = pattern.test(val);
    if (!isPatternValid) {
        validationErrorMessage = 'Commit must be in format "#TYPE [Where]: What". Remember about spaces and letter\'s cases';
        return false;
    }


    const [, type, scope, subject] = val.match(pattern);

    const isTypeValid = typeEnum.includes(type);
    if (!isTypeValid) {
        validationErrorMessage = 'Available types: #FEAT, #FIX, #HOTFIX, #WIP. Don\'t forget about "#" symbol';
        return false;
    }
    const isScopeValid = scope.length >= 5 && scope[1] === scope[1].toUpperCase();
    if (!isScopeValid) {
        validationErrorMessage = 'Scope [Where] must be started with uppercase letter and must contains at least 3 letters';
        return false;
    }

    const isSubjectValid = subject.length >= 3;
    if (!isSubjectValid) {
        validationErrorMessage = 'Subject [What] must contains at least 3 letters';
        return false;
    }

    return true
}

const checkPattern = ({ raw }) => {
    if(raw.includes('Merge branch')) return [true, ''];

    const rawCommitLines = raw.split('\n').filter((raw) => raw.length && raw[0] !== '%');

    const validateLines = rawCommitLines.reduce((acc, val) => {
        return acc && validateConcreteString(val);
    }, true);

    return [
        validateLines,
        !validateLines && `${validationErrorMessage}\n${defaultErrorMessage}`,
    ];
}
module.exports = {
    "plugins": [{
        "rules": {
            "match-team-pattern": checkPattern,
        }
    }],
    "rules": {
        "match-team-pattern": [2, "always"],
    }
}
